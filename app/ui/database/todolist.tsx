"use client";

import { TodoListItem } from "@/app/lib/models";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import * as databaseActions from "@/app/lib/actions-database";

interface Props {
  items: TodoListItem[];
}

export default function TodoList({ items: initialItems }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addNewTodo = async () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value.trim();
    if (value == "") return;

    setIsAdding(true);

    const item = await databaseActions.addNewTodo(value);
    if (item) {
      setItems([...items, item]);
    }

    inputRef.current.value = "";
    setIsAdding(false);
  };

  const removeSelectedTodos = async () => {
    if (selectedItems.length == 0) return;

    setIsRemoving(true);

    const removedItems = (await databaseActions.deleteTodos(selectedItems)).map(
      (item) => item.id,
    );
    if (removedItems) {
      setItems(items.filter((item) => !removedItems.includes(item.id)));
    }

    setIsRemoving(false);
  };

  return (
    <div
      className={
        "flex h-full w-5/12 flex-col gap-4 rounded-md border border-main-orange p-2"
      }
    >
      <div className={"flex w-full gap-2"}>
        <Input
          type="text"
          placeholder="Enter new todo"
          ref={inputRef}
          className={"focus-visible:ring-main-orange"}
        />
        <Button
          onClick={addNewTodo}
          className={"bg-main-orange hover:bg-hover-main-orange"}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Adding...</span>
            </>
          ) : (
            <span>Add</span>
          )}
        </Button>
        <Button
          onClick={removeSelectedTodos}
          variant="destructive"
          disabled={isRemoving}
        >
          {isRemoving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <span>Delete</span>
          )}
        </Button>
      </div>
      <div
        className={
          "flex max-h-80 min-h-80 w-full flex-col gap-2 overflow-y-auto"
        }
      >
        {items.map((item, i) => (
          <div
            key={`todo-${i}`}
            className={`w-full cursor-pointer overflow-ellipsis border-l border-l-main-orange p-2 ${selectedItems.includes(item.id) ? "bg-main-orange hover:bg-hover-main-orange" : "bg-transparent hover:bg-main-gray"}`}
            onClick={() => {
              if (selectedItems.includes(item.id)) {
                setSelectedItems(selectedItems.filter((id) => id != item.id));
              } else {
                setSelectedItems([...selectedItems, item.id]);
              }
            }}
          >
            {item.value.slice(0, 50)}
          </div>
        ))}
      </div>
    </div>
  );
}
