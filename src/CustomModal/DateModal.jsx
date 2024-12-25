import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const DateModal = ({ closeModal, id, fetchData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDate = async () => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/update-booking/${id}`,
        {
          bookingDate: startDate,
        }
      );
      console.log(data);
      toast.success("booking date updated successfully");
      closeModal();
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="fixed inset-0 lg:h-[400px] overflow-y-scroll bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white overflow-y-auto w-11/12 md:w-8/12 lg:w-6/12 max-h-[90vh] rounded-lg p-6 shadow-2xl border-4 border-indigo-700">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Update Your Booking Date
        </h1>

        {/* DatePicker */}
        <div className="form-control mb-4">
          <DatePicker
            minDate={new Date()}
            dateFormat="dd-MM-yyyy HH:mm"
            className="input input-bordered w-full"
            selected={startDate}
            popperPlacement="top-start"
            onChange={(date) => setStartDate(date)}
            popperModifiers={[
              {
                name: "preventOverflow",
                options: {
                  boundary: "viewport",
                },
              },
            ]}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            onClick={handleDate}
            className="btn bg-indigo-700 text-white w-full py-2 rounded hover:bg-indigo-800 transition-all"
          >
            Confirm
          </button>
          <button
            type="button"
            className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition-all"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateModal;
