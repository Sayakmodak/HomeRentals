import React from 'react'

const CreateRoom = () => {
  return (
    <div>
      <div className="space-y-8 max-w-md mx-auto">
        <div>
          <labe className="mb-2 text-sm text-slate-900 font-medium block">
            Room Name
          </labe>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter room name"
              className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333]"
            />

            <div className="absolute left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                fill="#bbb"
                viewBox="0 0 512 512"
              >
                <path
                  d="M437.02 74.981C388.667 26.629 324.38 0 256 0S123.333 26.629 74.98 74.981C26.629 123.333 0 187.62 0 256s26.629 132.667 74.98 181.019C123.333 485.371 187.62 512 256 512s132.667-26.629 181.02-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.667-74.98-181.019zM256 482c-66.869 0-127.037-29.202-168.452-75.511C113.223 338.422 178.948 290 256 290c-49.706 0-90-40.294-90-90s40.294-90 90-90 90 40.294 90 90-40.294 90-90 90c77.052 0 142.777 48.422 168.452 116.489C383.037 452.798 322.869 482 256 482z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <labe className="mb-2 text-sm text-slate-900 font-medium block">
            Your Email
          </labe>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Enter email"
              className="pr-4 pl-12 py-3 text-sm text-slate-900 rounded bg-white border border-gray-400 w-full outline-[#333]"
            />

            <div className="absolute left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22px"
                height="22px"
                fill="#bbb"
                viewBox="0 0 512 512"
              >
                <path
                  d="M298.789 313.693c-12.738 8.492-27.534 12.981-42.789 12.981-15.254 0-30.05-4.489-42.788-12.981L3.409 173.82A76.269 76.269 0 0 1 0 171.403V400.6c0 26.278 21.325 47.133 47.133 47.133h417.733c26.278 0 47.133-21.325 47.133-47.133V171.402a75.21 75.21 0 0 1-3.416 2.422z"
                  data-original="#000000"
                />
                <path
                  d="m20.05 148.858 209.803 139.874c7.942 5.295 17.044 7.942 26.146 7.942 9.103 0 18.206-2.648 26.148-7.942L491.95 148.858c12.555-8.365 20.05-22.365 20.05-37.475 0-25.981-21.137-47.117-47.117-47.117H47.117C21.137 64.267 0 85.403 0 111.408a44.912 44.912 0 0 0 20.05 37.45z"
                  data-original="#000000"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom
