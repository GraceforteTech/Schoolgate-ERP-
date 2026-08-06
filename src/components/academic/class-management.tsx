import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function ClassManagement() {
  const classes = [
    { name: "JSS 1A", teacher: "Mr. Yusuf Bello", capacity: 40, enrolled: 38 },
    { name: "JSS 1B", teacher: "Mrs. Sarah Okon", capacity: 40, enrolled: 35 },
    { name: "SS 3G", teacher: "Mr. David Segun", capacity: 30, enrolled: 28 },
  ];
  return (
    <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class</TableHead>
            <TableHead>Class Teacher</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Enrolled</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((c, i) => (
            <TableRow key={i}>
              <TableCell className="font-bold">{c.name}</TableCell>
              <TableCell>{c.teacher}</TableCell>
              <TableCell>{c.capacity}</TableCell>
              <TableCell>{c.enrolled}</TableCell>
              <TableCell><Button variant="ghost" size="sm">Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
