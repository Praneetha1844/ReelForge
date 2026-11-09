import SelectTopic from "./Components/SelectTopic";

export const metadata = { title: "Create new | ReelForge" };

export default function CreateNew() {
  return (
    <div className="md:px-20">
      <h1 className="text-center text-4xl font-bold text-purple-700">Create New</h1>
      <div className="mt-10 p-10 shadow-md">
        <SelectTopic />
      </div>
    </div>
  );
}
