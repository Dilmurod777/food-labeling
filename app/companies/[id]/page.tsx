"use client";

import * as databaseActions from "@/app/lib/actions-database";
import { Company } from "@/app/lib/models";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [company, setCompany] = useState<Company | null>();
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    setFetching(true);
    const company = await databaseActions.getCompany(params.id);
    setCompany(company);
    setFetching(false);
  };

  const saveCompanyData = async () => {
    if (!company) return;

    setUpdating(true);

    await databaseActions.updateCompany(company);

    setUpdating(false);
  };

  if (fetching) {
    return (
      <div className={"flex h-16 w-full items-center justify-center"}>
        Loading...
      </div>
    );
  }

  if (!company) {
    return (
      <div className={"flex h-16 w-full items-center justify-center"}>
        No such company was found.
      </div>
    );
  }

  return (
    <div className={"flex h-full w-full flex-grow flex-col gap-2 px-12 py-6"}>
      <h2 className={"text-xl/none"}>Company info</h2>
      <hr />
      <div className={"mt-2 flex w-full flex-col gap-4"}>
        <div className="flex w-full max-w-sm flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id={"name"}
            type="text"
            placeholder="Enter name"
            value={company.name}
            maxLength={50}
            className={"focus-visible:ring-main-orange"}
            onChange={(e) =>
              setCompany({ ...company, name: e.target.value.trim() })
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={company.email}
            className={"focus-visible:ring-main-orange"}
            onChange={(e) =>
              setCompany({ ...company, email: e.target.value.trim() })
            }
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="note">Note</Label>
          <Textarea
            placeholder="Enter note"
            value={company.note || ""}
            className={"h-36 max-h-48 min-h-32 focus-visible:ring-main-orange"}
            onChange={(e) =>
              setCompany({ ...company, note: e.target.value.trim() })
            }
          />
        </div>
      </div>

      <Button
        variant={"default"}
        className={"w-20"}
        onClick={saveCompanyData}
        disabled={updating || company.name == ""}
      >
        {updating ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
