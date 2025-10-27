import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Filters } from "@/lib/mentors/search";

type QueryKeys =
  | "q"
  | "expertise"
  | "ods"
  | "seniority"
  | "lang"
  | "location"
  | "remote"
  | "available"
  | "sort";
const SORT_VALUES: Array<NonNullable<Filters["sort"]>> = ["recommended", "availability", "recent"];

function parseCsv(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function parseNumberCsv(value: string | null): number[] {
  return parseCsv(value).map((part) => Number.parseInt(part, 10)).filter((num) => Number.isFinite(num));
}

function parseBoolean(value: string | null): boolean | undefined {
  if (value === null) {
    return undefined;
  }

  if (value === "1" || value === "true") {
    return true;
  }

  if (value === "0" || value === "false") {
    return false;
  }

  return undefined;
}

function buildSearchParams(state: Filters): URLSearchParams {
  const params = new URLSearchParams();

  const entries: Array<[QueryKeys, unknown]> = [
    ["q", state.q?.trim()],
    ["expertise", state.expertise?.length ? state.expertise : undefined],
    ["ods", state.ods?.length ? state.ods.map(String) : undefined],
    ["seniority", state.seniority?.trim()],
    ["lang", state.lang?.length ? state.lang : undefined],
    ["location", state.location?.trim()],
    ["remote", state.remote],
    ["available", state.available],
    ["sort", state.sort],
  ];

  for (const [key, value] of entries) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      params.set(key, value.join(","));
      continue;
    }

    if (typeof value === "boolean") {
      params.set(key, value ? "1" : "0");
      continue;
    }

    params.set(key, String(value));
  }

  return params;
}

function parseSearch(search: string, fallback: Filters): Filters {
  const params = new URLSearchParams(search);
  const state: Filters = {
    q: params.get("q") ?? fallback.q ?? "",
    expertise: parseCsv(params.get("expertise")),
    ods: parseNumberCsv(params.get("ods")),
    seniority: params.get("seniority") ?? fallback.seniority,
    lang: parseCsv(params.get("lang")),
    location: params.get("location") ?? fallback.location ?? "",
    remote: parseBoolean(params.get("remote")),
    available: parseBoolean(params.get("available")),
    sort: params.get("sort") as Filters["sort"],
  };

  if (state.sort && !SORT_VALUES.includes(state.sort)) {
    state.sort = fallback.sort ?? "recommended";
  } else if (!state.sort) {
    state.sort = fallback.sort ?? "recommended";
  }

  return {
    ...fallback,
    ...state,
    expertise: state.expertise,
    ods: state.ods,
    lang: state.lang,
  };
}

function filtersAreEqual(a: Filters, b: Filters): boolean {
  if (a === b) {
    return true;
  }

  return (
    (a.q ?? "") === (b.q ?? "") &&
    (a.seniority ?? "") === (b.seniority ?? "") &&
    (a.location ?? "") === (b.location ?? "") &&
    (a.sort ?? "") === (b.sort ?? "") &&
    a.remote === b.remote &&
    a.available === b.available &&
    arraysAreEqual(a.expertise ?? [], b.expertise ?? []) &&
    arraysAreEqual(a.ods ?? [], b.ods ?? []) &&
    arraysAreEqual(a.lang ?? [], b.lang ?? [])
  );
}

function arraysAreEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  return a.every((item, index) => item === b[index]);
}

export type SetQueryState = (updater: Filters | ((prev: Filters) => Filters)) => void;

export function useQueryState(initial: Filters): [Filters, SetQueryState] {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRef = useRef(initial);
  const [state, setState] = useState<Filters>(() => parseSearch(location.search, initial));

  const updateUrl = useCallback(
    (nextState: Filters) => {
      const params = buildSearchParams(nextState);
      const searchString = params.toString();
      const nextSearch = searchString ? `?${searchString}` : "";

      if (nextSearch === location.search) {
        return;
      }

      navigate({ pathname: location.pathname, search: nextSearch }, { replace: false });
    },
    [location.pathname, location.search, navigate],
  );

  const setQueryState = useCallback<SetQueryState>(
    (updater) => {
      setState((prev) => {
        const next = typeof updater === "function" ? (updater as (value: Filters) => Filters)(prev) : updater;
        return {
          ...initialRef.current,
          ...next,
          expertise: next.expertise ?? [],
          ods: next.ods ?? [],
          lang: next.lang ?? [],
        };
      });
    },
    [],
  );

  useEffect(() => {
    const parsed = parseSearch(location.search, initialRef.current);
    if (!filtersAreEqual(parsed, state)) {
      setState(parsed);
    }
  }, [location.search, state]);

  useEffect(() => {
    const params = buildSearchParams(state);
    const searchString = params.toString();
    const nextSearch = searchString ? `?${searchString}` : "";

    if (nextSearch !== location.search) {
      updateUrl(state);
    }
  }, [location.search, state, updateUrl]);

  return useMemo(() => [state, setQueryState], [setQueryState, state]);
}
