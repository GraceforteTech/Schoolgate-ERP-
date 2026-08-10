import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { generateReportPins, redeemPin, togglePinStatus, bulkDeactivatePins } from "@/lib/report-pins.functions";
import { checkTableExists } from "@/lib/db-check.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/report-pin-test")({
  component: ReportPinTestPage,
});

function ReportPinTestPage() {
  const [results, setResults] = useState<string[]>([]);
  const tenantId = "00000000-0000-0000-0000-000000000001";
  
  const log = (msg: string) => setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);

  useEffect(() => {
    const verifyDb = async () => {
      log("Verifying database schema...");
      const status = await checkTableExists();
      if (status.exists) {
        log("DATABASE OK: 'report_pins' table found.");
      } else {
        log(`DATABASE ERROR: ${status.error} (Code: ${status.code})`);
        log("Wait... If it says 'not found in schema cache', I might need to wait for PostgREST to reload.");
      }
    };
    verifyDb();
  }, []);

  const runTests = async () => {
    try {
      setResults(prev => [...prev, "---"]);
      log(`Starting Report PIN E2E Tests with Tenant: ${tenantId}`);

      // TEST 1: Generation
      log("TEST 1: Generating unique PINs for Students A, B, C...");
      const students = ["student-a", "student-b", "student-c"];
      const pins = await generateReportPins({
        data: {
          tenantId,
          students,
          sessionId: "2023/2024",
          termId: "Second Term",
          classId: "JSS 2A",
          usageLimit: 3
        }
      });
      
      const pinA = pins.find(p => p.student_id === "student-a")?.pin_code;
      const pinB = pins.find(p => p.student_id === "student-b")?.pin_code;
      const pinC = pins.find(p => p.student_id === "student-c")?.pin_code;

      if (pinA && pinB && pinC && pinA !== pinB && pinB !== pinC) {
        log("PASS: Unique PINs generated.");
      } else {
        log("FAIL: PINs were not unique or missing.");
      }

      // TEST 2 & 3: Usage and Privacy
      log("TEST 2/3: Verifying usage and student privacy...");
      const redemption = await redeemPin({ data: { pinCode: pinA!, tenantId } });
      if (redemption.success && redemption.student_id === "student-a") {
        log("PASS: Student A PIN correctly identified Student A.");
      } else {
        log(`FAIL: PIN redemption failed or returned wrong student. ${JSON.stringify(redemption)}`);
      }

      // TEST 4: Deactivation
      log("TEST 4: Deactivating Student B...");
      const pinB_obj = pins.find(p => p.student_id === "student-b");
      await togglePinStatus({ data: { pinId: pinB_obj!.id, status: 'deactivated' } });
      const failRedemption = await redeemPin({ data: { pinCode: pinB!, tenantId } });
      if (!failRedemption.success && failRedemption.error === "PIN is deactivated") {
        log("PASS: Deactivated PIN rejected.");
      } else {
        log(`FAIL: Deactivated PIN was not rejected. Result: ${JSON.stringify(failRedemption)}`);
      }

      // TEST 6: Bulk Deactivate
      log("TEST 6: Bulk deactivating class JSS 2A...");
      await bulkDeactivatePins({ data: { tenantId, classId: "JSS 2A", sessionId: "2023/2024", termId: "Second Term" } });
      const bulkFail = await redeemPin({ data: { pinCode: pinA!, tenantId } });
      if (!bulkFail.success && bulkFail.error === "PIN is deactivated") {
        log("PASS: Bulk deactivation successful.");
      } else {
        log(`FAIL: Bulk deactivation failed. Result: ${JSON.stringify(bulkFail)}`);
      }

      log("E2E Tests Finished.");
    } catch (err: any) {
      log(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Report PIN System E2E Verifier</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={runTests} className="bg-schoolgate-green">RUN TESTS</Button>
          <div className="mt-4 p-4 bg-slate-900 text-emerald-400 font-mono text-sm rounded-lg min-h-[300px]">
            {results.map((r, i) => <div key={i}>{r}</div>)}
            {results.length === 0 && <div>Initializing test environment...</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
