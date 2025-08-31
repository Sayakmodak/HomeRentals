import React from 'react'

const ListRoom = () => {
  return (
    <div className="ml-5">
      <h1 className="font-semibold text-2xl mb-2">List Room</h1>
      <p className="mb-2">
        View, edit, or manage all listed rooms. Keep the information up-to-date
        to provide the best experience for users.
      </p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price /night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            <tr>
              <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>Single Bed</td>
              <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>Pool Access, Mountain View, Free Breakfast</td>
              <td className='py-3 px-8 text-gray-700 border-t border-gray-300'>499</td>
              <td className='py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300'>
                <label htmlFor="" className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                  <input type="checkbox" className='sr-only peer'/>
                  <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>
                  </div>
                  <span className='dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'>
                  </span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListRoom
