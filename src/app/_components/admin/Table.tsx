

// table.tsx
"use client";

import React from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "~/app/_components/ui/data-table";
import { Badge } from "~/app/_components/ui/badge";
import { format } from "date-fns";

// 1. Define columnas
export type Group = {
  id: string;
  name: string;
  description: string;
  isVerified: boolean;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Group>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => row.original.isVerified ? <Badge>Yes</Badge> : <Badge variant="outline">No</Badge>,
  },
  {
    accessorKey: "isOpen",
    header: "Open",
    cell: ({ row }) => row.original.isOpen ? <Badge>Open</Badge> : <Badge variant="outline">Closed</Badge>,
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => format(row.original.createdAt, "yyyy-MM-dd"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => format(row.original.updatedAt, "yyyy-MM-dd"),
  },
];

// 2. Datos de prueba (15 elementos)
const data: Group[] = Array.from({ length: 15 }).map((_, i) => {
  const now = new Date();
  return {
    id: `GRP${i + 1}`,
    name: `Group ${i + 1}`,
    description: `Description for Group ${i + 1}`,
    isVerified: i % 2 === 0,
    isOpen: i % 3 !== 0,
    createdAt: new Date(now.getTime() - i * 86400000),
    updatedAt: new Date(now.getTime() - i * 43200000),
  };
});

// 3. Componente principal
const DemoTable = () => {
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoTable;
