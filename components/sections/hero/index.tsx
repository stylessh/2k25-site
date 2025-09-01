import { Text } from "@/components/ui/text";

export function Hero() {
  return (
    <section className="flex flex-col gap-y-6">
      <Text variant="heading" as="h1">
        Alan Daniel
      </Text>

      <Text>
        Designing and Engineering fresh, functional, accesible and great-looking
        user interfaces and experiences.
      </Text>

      <Text className="inline-flex gap-x-2 items-center">
        Currently working at{" "}
        <Text variant="highlight" as="span">
          Supabase
        </Text>
      </Text>
    </section>
  );
}
