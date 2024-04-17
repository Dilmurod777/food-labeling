import { BsBoxes } from "react-icons/bs";
import { ReactNode, useState } from "react";

interface MenuItem {
  icon: ReactNode;
  items: MenuSubItem[];
}

interface MenuSubItem {
  imgPath: string;
  modelPath: string;
}

export default function Menu() {
  const menuItems: MenuItem[] = [
    {
      icon: <BsBoxes />,
      items: [
        {
          imgPath: "",
          modelPath: "",
        },
      ],
    },
  ];
  const [activeMenuItem, setActiveMenuItem] = useState(-1);

  return (
    <div
      className={
        "absolute left-10 top-10 flex min-h-[50%] gap-2 rounded-md border border-main-orange bg-white p-4"
      }
    >
      <div className={"flex flex-col gap-2 border-r border-r-main-gray pr-4"}>
        {menuItems.map((item, i) => (
          <div
            key={`3d-menu-item-${i}`}
            className={`cursor-pointer rounded-md border border-main-gray p-2 text-3xl  hover:bg-main-orange hover:text-white ${activeMenuItem == i ? "bg-main-orange text-white" : "bg-white text-black"}`}
            onClick={() => setActiveMenuItem(i)}
          >
            {item.icon}
          </div>
        ))}
      </div>
      {activeMenuItem >= 0 && (
        <div className={"flex flex-col gap-2"}>
          {menuItems[activeMenuItem].items.map((item, i) => (
            <div
              key={`3d-menu-subItem-${i}`}
              className={
                "cursor-pointer rounded-md border border-main-gray p-2 text-3xl text-black hover:bg-main-orange hover:text-white"
              }
            >
              {item.imgPath}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
