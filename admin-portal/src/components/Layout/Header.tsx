import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <div className="relative">
            <button className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder={t('header.search', 'Search...')}
              className="w-full rounded-lg border border-stroke bg-transparent py-2 pl-11 pr-4 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Language Dropdown --> */}
            <li className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 rounded-lg py-2 px-3 font-medium text-gray-600 hover:bg-gray-100"
              >
                {i18n.language === 'ar' ? 'العربية' : 'English'}
              </button>
            </li>

            {/* <!-- User Dropdown --> */}
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <span className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  A
                </span>
                <span className="hidden text-right lg:block">
                  <span className="block text-sm font-medium text-black dark:text-white">
                    Admin
                  </span>
                  <span className="block text-xs font-medium">Admin</span>
                </span>
              </button>

              {/* <!-- Dropdown Start --> */}
              <div
                className={`absolute ${
                  isRTL ? 'left-0' : 'right-0'
                } mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
                  dropdownOpen ? 'block' : 'hidden'
                }`}
              >
                <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                          fill=""
                        />
                        <path
                          d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                          fill=""
                        />
                      </svg>
                      {t('header.profile', 'My Profile')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                    >
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.8656 8.86874C20.5219 8.49062 20.0406 8.28437 19.525 8.28437H19.4219C19.25 8.28437 19.1125 8.18124 19.0781 8.04374C19.0437 7.90624 18.975 7.80312 18.9406 7.66562C18.8719 7.52812 18.9406 7.39062 19.0437 7.28749L19.1125 7.21874C19.4906 6.87499 19.6969 6.39374 19.6969 5.87812C19.6969 5.36249 19.525 4.88124 19.1469 4.50312L17.8062 3.12812C17.0844 2.37187 15.8469 2.33749 15.0906 3.09374L14.9875 3.16249C14.8844 3.26562 14.7125 3.29999 14.5406 3.23124C14.4031 3.16249 14.2656 3.09374 14.0937 3.05937C13.9219 2.99062 13.8187 2.85312 13.8187 2.71562V2.54374C13.8187 1.47812 12.9594 0.618744 11.8937 0.618744H9.96875C9.45312 0.618744 8.97187 0.824994 8.62812 1.16874C8.25 1.54687 8.07812 2.02812 8.07812 2.50937V2.64687C8.07812 2.78437 7.975 2.92187 7.8375 2.99062C7.76875 3.02499 7.73437 3.02499 7.66562 3.05937C7.52812 3.12812 7.35625 3.09374 7.25312 2.99062L7.18437 2.88749C6.84062 2.50937 6.35937 2.30312 5.84375 2.30312C5.32812 2.30312 4.84687 2.47499 4.46875 2.85312L3.09375 4.19374C2.3375 4.91562 2.30312 6.15312 3.05937 6.90937L3.12812 6.97812C3.23125 7.08124 3.26562 7.25312 3.19687 7.39062C3.12812 7.52812 3.09375 7.66562 3.02499 7.80312C2.95625 7.97499 2.85312 8.04374 2.68125 8.04374H2.57812C2.0625 8.04374 1.58125 8.21562 1.20312 8.59374C0.824996 8.97187 0.618746 9.45312 0.618746 9.96874V11.9625C0.618746 13.0281 1.47812 13.8875 2.54375 13.8875H2.68125C2.81875 13.8875 2.95625 13.9906 3.02499 14.1281C3.05937 14.2312 3.12812 14.3344 3.16249 14.4375C3.23125 14.575 3.16249 14.7125 3.05937 14.8156L2.99062 14.8844C2.61249 15.2281 2.40625 15.7094 2.40625 16.225C2.40625 16.7406 2.57812 17.2219 2.95625 17.6L4.29687 18.975C5.01875 19.7312 6.25625 19.7656 7.0125 19.0094L7.11562 18.9406C7.21875 18.8375 7.39062 18.8031 7.5625 18.8719C7.7 18.9406 7.8375 19.0094 8.00937 19.0437C8.18125 19.1125 8.28437 19.25 8.28437 19.3875V19.4906C8.28437 20.5562 9.14375 21.4156 10.2094 21.4156H12.1344C13.2 21.4156 14.0594 20.5562 14.0594 19.4906V19.3531C14.0594 19.2156 14.1625 19.0781 14.3 19.0094C14.3687 18.975 14.4031 18.975 14.4719 18.9406C14.6094 18.8719 14.7812 18.9062 14.8844 19.0094L14.9531 19.1125C15.2969 19.4906 15.7781 19.6969 16.2937 19.6969C16.8094 19.6969 17.2906 19.525 17.6687 19.1469L19.0437 17.7719C19.8 17.05 19.8344 15.8125 19.0781 15.0562L19.0094 14.9875C18.9062 14.8844 18.8719 14.7125 18.9406 14.575C19.0094 14.4375 19.0437 14.3 19.1125 14.1625C19.1812 13.9906 19.2844 13.9219 19.4562 13.9219H19.5937H19.6281C20.1437 13.9219 20.625 13.75 21.0031 13.3719C21.3812 12.9937 21.5875 12.5125 21.5875 11.9969V10.0031C21.5875 9.45312 21.4156 8.97187 21.0375 8.59374C20.7937 8.86874 20.8656 8.86874 20.8656 8.86874ZM19.8344 12.0312C19.8344 12.1 19.8 12.1687 19.7312 12.2375C19.6625 12.3062 19.5937 12.3062 19.525 12.3062H19.4219H19.3875C18.5281 12.3062 17.7719 12.8219 17.5312 13.6469C17.4969 13.75 17.4281 13.8531 17.3937 13.9562C17.0844 14.7812 17.3594 15.7094 18.0812 16.2937L18.15 16.3625C18.2187 16.4312 18.2187 16.5344 18.15 16.6031L16.7406 17.9781C16.6719 18.0469 16.6031 18.0469 16.5344 18.0469C16.4656 18.0469 16.3969 18.0469 16.3281 17.9781L16.2594 17.9094C15.5719 17.2219 14.6094 16.9469 13.7844 17.2562C13.6812 17.2906 13.5781 17.3594 13.475 17.3937C12.65 17.6344 12.1344 18.3906 12.1344 19.25V19.3531C12.1344 19.4219 12.1 19.4906 12.0312 19.5594C11.9625 19.6281 11.8937 19.6281 11.825 19.6281H9.9C9.83125 19.6281 9.7625 19.5937 9.69375 19.525C9.625 19.4562 9.625 19.3875 9.625 19.3187V19.2156C9.625 18.3562 9.10937 17.6 8.28437 17.3594C8.18125 17.325 8.07812 17.2562 7.975 17.2219C7.80312 17.1531 7.63125 17.1187 7.45937 17.1187C6.80625 17.1187 6.1875 17.3937 5.74062 17.875L5.67187 17.9437C5.60312 18.0125 5.5 18.0125 5.43125 18.0125C5.3625 18.0125 5.29375 18.0125 5.225 17.9437L3.81562 16.5687C3.74687 16.5 3.74687 16.4312 3.74687 16.3625C3.74687 16.2937 3.74687 16.225 3.81562 16.1562L3.88437 16.0875C4.57187 15.4 4.84687 14.4375 4.5375 13.6125C4.50312 13.5094 4.43437 13.4062 4.40002 13.3031C4.15937 12.4781 3.40312 11.9625 2.54375 11.9625H2.40625C2.3375 11.9625 2.26875 11.9281 2.2 11.8594C2.13125 11.7906 2.13125 11.7219 2.13125 11.6531V9.72812C2.13125 9.65937 2.16562 9.59062 2.23437 9.52187C2.30312 9.45312 2.37187 9.45312 2.44062 9.45312H2.54375C3.40312 9.45312 4.15937 8.9375 4.40002 8.1125C4.43437 8.00937 4.50312 7.90624 4.5375 7.80312C4.84687 6.97812 4.57187 6.04999 3.85 5.46562L3.78125 5.39687C3.7125 5.32812 3.7125 5.22499 3.7125 5.15624C3.7125 5.08749 3.7125 5.01874 3.78125 4.94999L5.15625 3.57499C5.225 3.50624 5.29375 3.50624 5.3625 3.50624C5.43125 3.50624 5.5 3.50624 5.56875 3.57499L5.63752 3.64374C6.32502 4.33124 7.28752 4.60624 8.11252 4.29687C8.21565 4.26249 8.31877 4.19374 8.4219 4.15937C9.24687 3.91874 9.7625 3.16249 9.7625 2.30312V2.16562C9.7625 2.09687 9.79687 2.02812 9.86562 1.95937C9.93437 1.89062 10.0031 1.89062 10.0719 1.89062H11.9969C12.0656 1.89062 12.1344 1.92499 12.2031 1.99374C12.2719 2.06249 12.2719 2.13124 12.2719 2.19999V2.33749C12.2719 3.19687 12.7875 3.95312 13.6125 4.19374C13.7156 4.22812 13.8187 4.29687 13.9219 4.33124C14.7469 4.64062 15.6781 4.36562 16.2625 3.67812L16.3312 3.60937C16.4 3.54062 16.4687 3.54062 16.5375 3.54062C16.6062 3.54062 16.675 3.54062 16.7437 3.60937L18.1187 4.98437C18.1875 5.05312 18.1875 5.12187 18.1875 5.19062C18.1875 5.25937 18.1875 5.32812 18.1187 5.39687L18.05 5.46562C17.3625 6.15312 17.0875 7.11562 17.3969 7.94062C17.4312 8.04374 17.5 8.14687 17.5344 8.24999C17.775 9.07499 18.5312 9.59062 19.3906 9.59062H19.5281C19.5969 9.59062 19.6656 9.62499 19.7344 9.69374C19.8031 9.76249 19.8031 9.83124 19.8031 9.89999V11.825C19.8344 11.9281 19.8344 11.9625 19.8344 12.0312Z"
                          fill=""
                        />
                        <path
                          d="M11 6.32498C8.42189 6.32498 6.32501 8.42186 6.32501 11C6.32501 13.5781 8.42189 15.675 11 15.675C13.5781 15.675 15.675 13.5781 15.675 11C15.675 8.42186 13.5781 6.32498 11 6.32498ZM11 14.1281C9.28126 14.1281 7.87189 12.7187 7.87189 11C7.87189 9.28123 9.28126 7.87186 11 7.87186C12.7188 7.87186 14.1281 9.28123 14.1281 11C14.1281 12.7187 12.7188 14.1281 11 14.1281Z"
                          fill=""
                        />
                      </svg>
                      {t('header.settings', 'Settings')}
                    </Link>
                  </li>
                </ul>
                <button
                  className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                      fill=""
                    />
                    <path
                      d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                      fill=""
                    />
                  </svg>
                  {t('header.logout', 'Log Out')}
                </button>
              </div>
              {/* <!-- Dropdown End --> */}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
