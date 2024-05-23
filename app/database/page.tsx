import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import * as databaseActions from "@/app/lib/actions-database";
import Content from "@/app/ui/database/content";
import TodoList from "@/app/ui/database/todolist";

export default async function Page() {
  const companies = await databaseActions.getAllCompanies();
  const productsHistory = await databaseActions.getAllCompanyProductsList();
  const todoList = await databaseActions.getAllTodoList();

  return (
    <Suspense fallback={<Loading />}>
      <div className={"flex flex-grow items-start gap-4 px-8 py-2"}>
        <Content
          productsHistory={productsHistory}
          todoListItems={todoList}
          companies={companies}
        />
      </div>
    </Suspense>
  );
}
