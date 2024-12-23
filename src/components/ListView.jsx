

const ListView = ({cars}) => {
    return (
        <div className="overflow-x-auto py-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Daily Rent Price</th>
              <th>Availability</th>
              <th>Posted Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 3 */}
            {cars && (
              cars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={car.image} alt="car photo" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{car.owner?.name}</div>
                        <div className="text-sm opacity-50">
                          {car?.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{car.model}</td>
                  <td>${car?.dailyPrice}/day</td>

                  <td>
                    <p
                      className={
                        car?.availability === "Available"
                          ? "text-green-600 bg-green-100/60 px-4 py-2 text-left rounded-xl"
                          : "text-purple-600 bg-purple-100/60 px-4 py-2 text-left rounded-xl"
                      }
                    >
                      {car?.availability}
                    </p>
                  </td>
                  <td>{car?.datePosted}</td>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs  bg-indigo-600 text-white hover:text-primary"
                    >
                      Book Now
                    </button>

                   
                  </th>
                </tr>
              ))
            ) 
            }
          </tbody>
        </table>
      </div>
    );
};

export default ListView;