import { Text } from "@/components/ui/text";
import { InteractionsCard, RedaktCard, VidssCard } from "./cards";

export function Projects() {
  return (
    <section className="flex flex-col gap-y-6">
      <Text variant="highlight" className="w-fit">
        Apps
      </Text>

      <div className="grid grid-cols-2 gap-4">
        <VidssCard />
        <RedaktCard />
        <InteractionsCard />
      </div>
    </section>
  );
}
