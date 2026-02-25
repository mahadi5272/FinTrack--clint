import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const res = await axios.post("http://localhost:3000/categories", data);
    if (res.data.insertedId) {
      toast.success("Category Added!");
      reset();
    }
  };

  return (
    <div className="p-10 bg-gray-100 rounded-xl">
      <h2 className="text-2xl font-bold mb-5">Create Category (Admin)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
        <input {...register("name")} placeholder="Category Name" className="input input-bordered w-full" required />
        <select {...register("type")} className="select select-bordered">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button className="btn btn-primary">Add</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default AddCategory;