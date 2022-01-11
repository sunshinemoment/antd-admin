import { Query, Result } from "./types";

export function generateData(query: Query) {
  return new Promise<Result>((r) => {
    setTimeout(() => {
      const pageSize = query.pageSize || 10;
      const current = query.pageSize || 1;
      r({
        dataSource: [...new Array(pageSize || 10)].map((_, i) => {
          const key = pageSize * (current - 1) + i + 1 + "";
          return {
            key,
            name: "name" + key,
            age: Math.floor(Math.random() * 60) + 10,
            address: "address" + key,
            tags: ["loser", "nice", "developer", "teacher", "cool"]
              .sort(() => 0.5 - Math.random())
              .slice(0, Math.floor(Math.random() * 3) + 1),
          };
        }),
        pagination: {
          current: query.current,
          pageSize: query.pageSize,
          total: 100,
        },
      });
    }, 500);
  });
}
