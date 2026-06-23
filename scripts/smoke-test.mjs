import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const port = Number(process.env.SMOKE_PORT ?? 3100);
const baseUrl = `http://127.0.0.1:${port}`;
const nextBin = "node_modules/next/dist/bin/next";

function startServer() {
  return spawn(process.execPath, [nextBin, "start", "-p", String(port), "-H", "127.0.0.1"], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: String(port), BOOKING_PROVIDER: process.env.BOOKING_PROVIDER ?? "mock" },
  });
}

async function waitForServer() {
  const startedAt = Date.now();
  while (Date.now() - startedAt < 30000) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      await wait(500);
    }
  }
  throw new Error(`Server did not become ready at ${baseUrl}.`);
}

async function expectStatus(path, expectedStatus) {
  const response = await fetch(`${baseUrl}${path}`);
  if (response.status !== expectedStatus) {
    throw new Error(`${path} returned ${response.status}, expected ${expectedStatus}.`);
  }
  return response;
}

async function runSmokeChecks() {
  await expectStatus("/", 200);
  await expectStatus("/admin", 200);
  await expectStatus("/privacy", 200);
  await expectStatus("/thanks", 200);
  await expectStatus("/robots.txt", 200);
  await expectStatus("/sitemap.xml", 200);

  const invalidBooking = await fetch(`${baseUrl}/api/booking`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({}),
  });
  if (invalidBooking.status !== 400) {
    throw new Error(`Invalid booking returned ${invalidBooking.status}, expected 400.`);
  }

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const validBooking = await fetch(`${baseUrl}/api/booking`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      branchId: "suerkulova",
      serviceId: "combo-color",
      masterId: "any",
      date: tomorrow,
      time: "12:00",
      name: "Smoke Test",
      phone: "+996700188331",
      messenger: "whatsapp",
      comment: "Automated smoke test",
      source: "smoke_test",
      consentAccepted: true,
    }),
  });
  if (validBooking.status !== 201) {
    const text = await validBooking.text();
    throw new Error(`Valid booking returned ${validBooking.status}, expected 201. Body: ${text}`);
  }
}

const server = startServer();
let stderr = "";
server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

try {
  await waitForServer();
  await runSmokeChecks();
  console.log(`Smoke checks passed at ${baseUrl}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  if (stderr) {
    console.error(stderr);
  }
  process.exitCode = 1;
} finally {
  server.kill();
}
