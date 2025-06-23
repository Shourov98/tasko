import { RiDeleteBin6Line } from "react-icons/ri";

export default function TaskCard() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Art and Craft</h3>
        <RiDeleteBin6Line size={24} color="red" className="hover:cursor-pointer "/>
      </div>
      <p className="text-sm text-textBody line-clamp-2">
        Select the role that you want to candidates for and upload your job description.
      </p>
      <div className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="text-textBody">Friday, April 19 – 2024</span>
        <span className="font-medium text-brandMint">Pending</span>
      </div>
    </div>
  );
}
