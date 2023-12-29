"use client";

import { Button, Input } from "@nextui-org/react";

export function FormSecurity() {
  return (
    <>
      <form>
        <div className="grid grid-flow-row md:grid-cols-2 gap-4">
          <div>
            <Input
              key={"outside"}
              radius={"sm"}
              type="text"
              label="Password"
              placeholder="Enter your Password"
              labelPlacement={"outside"}
            />
          </div>
          <div>
            <Input
              key={"outside"}
              radius={"sm"}
              type="email"
              label="Confirm Password"
              placeholder="Enter your Confirm Password"
              labelPlacement={"outside"}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 text-white bg-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Update Password
        </Button>
      </form>
    </>
  );
}
