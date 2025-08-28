import { DollarSign, Hotel } from 'lucide-react';
import React from 'react'

const Dashboard = () => {
  return (
    <div className="border-red-400 ml-[265px]">
      <h1 className='font-semibold text-2xl mb-2'>Dashboard</h1>
      <p
        align="left"
        font="outfit"
        title="Dashboard"
        subtitle="Monitor your room listings, track bookings and analyze reveneu-all in one place. Stay updated with real-time insights to ensure smooth operations."
      >
        Monitor your room listings, track bookings and analyze reveneu-all in
        one place. <br />Stay updated with real-time insights to ensure smooth
        operations.
      </p>

      <div className="flex gap-4 my-8">
        {/* Total Bookings */}
        <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-4 pr-8">
          <Hotel className="text-blue-500" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">5</p>
          </div>
        </div>

        {/* Total Reveneu */}
        <div className="bg-primary/3 border border-primary/10 rounded flex items-center p-4 pr-8">
          <DollarSign className="text-blue-500" />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Reveneu</p>
            <p className="text-neutral-400 text-base">$500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
