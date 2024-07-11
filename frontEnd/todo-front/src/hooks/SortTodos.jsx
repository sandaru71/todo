import { useCallback } from "react";

export const useSortTodos = () => {
  const sortTodos = useCallback((data) => {
    return data.sort((a, b) => {
      // If both todos are completed or not completed, sort by modification time
      if ((a.status && b.status) || (!a.status && !b.status)) {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }

      // If a is status and b is not, a should come after b
      if (a.status && !b.status) {
        return 1;
      }

      // If b is completed and a is not, b should come after a
      if (!a.status && b.status) {
        return -1;
      }

      return 0;
    });
  }, []);

  return { sortTodos };
};
