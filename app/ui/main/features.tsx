import Image from "next/image";
import Link from "next/link";

interface Feature {
  name: string;
  description: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      name: "🛡️ Secure Online Product Storage",
      description:
        "Utilize secure cloud-based storage for your products, ensuring they are safe and accessible from anywhere.",
    },
    {
      name: "🎨 Diverse Label Designs for Your Brand",
      description:
        "Choose from a variety of professionally-designed label templates to match your brand and product image.",
    },
    {
      name: "✏️ Tailored Label Creation for Your Products",
      description:
        "Personalize your labels with customizable nutrients to make your products stand out.",
    },
    {
      name: "📤 Export in Multiple Formats for Convenience",
      description:
        "Easily export your labels in various formats, such as PDF or PNG, to suit your needs and workflow.",
    },
  ];

  return (
    <div
      className={
        "mx-auto my-0 flex w-full flex-wrap justify-center gap-x-8 border-y-2 border-main-gray bg-white px-12 py-8 text-center"
      }
    >
      {features.map((feature, i) => (
        <div
          key={`feature-${i}`}
          className={`flex w-[45%] flex-col gap-2 py-4 ${i < features.length / 2 ? "border-b-2 border-b-main-gray" : ""}`}
        >
          <p className={"text-xl/none font-bold text-black"}>{feature.name}</p>
          <p className={"text-base/none font-light text-black"}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
