"use server";

import db from "./db";

export type Row = Record<string, unknown>;

export interface QueryResponse<T extends Row = Row> {
  rows: T[];
  rowCount: number | null;
}

export async function query<T extends Row>(
  text: string,
  params?: unknown[],
): Promise<QueryResponse<T>> {
  const res = await db.query(text, params);
  return { rows: res.rows as T[], rowCount: res.rowCount };
}

export async function execute(text: string, params?: unknown[]): Promise<number> {
  const res = await db.query(text, params);
  return res.rowCount ?? 0;
}

export async function getRow<T extends Row>(
  text: string,
  params?: unknown[],
): Promise<T> {
  const res = await query<T>(text, params);
  if (res.rowCount === 0) throw new Error("No row found");
  return res.rows[0];
}

export function getRows<T extends Row>(
  text: string,
  params?: unknown[],
): Promise<QueryResponse<T>> {
  return query<T>(text, params);
}
