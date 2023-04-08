import { AiOutlineControl } from 'react-icons/ai';
import PropTypes from 'prop-types';

const ThemeChanger = ({ theme, setTheme, themeConfig }) => {
  const changeTheme = (e, selectedTheme) => {
    e.preventDefault();
    document.querySelector('html').setAttribute('data-theme', selectedTheme);

    typeof window !== 'undefined' &&
      localStorage.setItem('gitprofile-theme', selectedTheme);

    setTheme(selectedTheme);
  };

  return (
    <div className="card overflow-visible shadow-lg compact bg-base-100">
      <div className="flex-row items-center space-x-4 flex pl-6 pr-2 py-4">
        <div className="flex-1">
          <h5 className="card-title">
         
              <span className="text-base-content opacity-70">Theme</span>
           
          </h5>
        </div>
        <div className="flex-0">
            <div title="Change Theme" className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost m-1 normal-case opacity-50 text-base-content"
              >
                <AiOutlineControl className="inline-block w-5 h-5 stroke-current md:mr-2" />
                <span className="hidden md:inline mt-1">Change Theme</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1792 1792"
                  className="inline-block w-4 h-4 ml-1 fill-current"
                >
                  <path d="M1395 736q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z" />
                </svg>
              </div>
              <div
                tabIndex={0}
                className="mt-16 overflow-y-auto shadow-2xl top-px dropdown-content max-h-96 w-52 rounded-lg bg-base-200 text-base-content"
              >
                <ul className="p-4 menu compact">
                  {[
                    themeConfig.defaultTheme,
                    ...themeConfig.themes.filter(
                      (item) => item !== themeConfig.defaultTheme
                    ),
                  ].map((item, index) => (
                    <li key={index}>
                      {/* eslint-disable-next-line */}
                      <a
                        onClick={(e) => changeTheme(e, item)}
                        className={`${theme === item ? 'active' : ''}`}
                      >
                        <span className="opacity-60 capitalize">
                          {item === themeConfig.defaultTheme ? 'Default' : item}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

ThemeChanger.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func.isRequired,
  themeConfig: PropTypes.object.isRequired,
};

export default ThemeChanger;
