import Select from "react-select";

interface Option {
  value: any;
  label: string;
}

function MUSelect(props: {
  value: any;
  options: Option[];
  placeholder: string;
  onChange: any;
}): JSX.Element {
  const { value, options, onChange, ...rest } = props;
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderTop: "1px solid #9B50FF",
      color: "white",
      padding: "8px 16px",
      cursor: "pointer",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    container: (provided, state) => ({
      ...provided,
      border: "1px solid #9B50FF",
      borderRadius: 4,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "white",
      cursor: "pointer",
    }),
    control: (provided, state) => ({
      ...provided,
      borderWidth: 1,
      borderColor: "#9B50FF",
      padding: 0,
      boxShadow: "none",
      border: "none",
      cursor: "pointer",
    }),
    menu: (provided, state) => ({
      ...provided,
      border: "1px solid #9B50FF",
      borderRadius: 2,
      borderTop: "none",
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
    }),
  };

  return (
    <Select
      isSearchable={false}
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "#9B50FF",
          primary25: "#1B112B",
          primary50: "#1B112B",
          neutral0: "#1B112B",
          neutral5: "#1B112B",
          neutral50: "white",
        },
      })}
      value={value}
      options={options}
      onChange={onChange}
      {...rest}
    />
  );
}

export default MUSelect;
