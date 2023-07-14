import { Button } from "primereact/button";
import { AiFillDelete } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

/** @className =  any className ex: padding/ margin /color*/
/** @title = Title of the button ex: Save*/
/** @disabled = Disable the button => true / false*/
/** @label = Button name ex: Save*/
/** @icon = Icon Name ex: pi pi-check */
/** @onClick = onClick Action Method */
/** @loading = if button disabled and loading */
/** @type = button type ex: submit, reset */

CommonButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    bigButton: PropTypes.bool,
    // Add other prop validations as needed
  };

  SearchButton.propTypes = {
    loading: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.node,
    // Add other prop validations as needed
  };

  DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  
  EditButton.propTypes = {
    onClick: PropTypes.func.isRequired,
  };
  
  
export const CommonButton = ({ type = "submit", className, title, disabled, label, icon, onClick, loading, bigButton }, ...rest) => {
    return <Button type={type} label={label} title={title} icon={icon} disabled={disabled} className={`${!bigButton && "p-button-sm"} ${className}`} onClick={onClick} loading={loading} {...rest} />;
};

  

export const BackButton = () => {
    const history = useHistory();
    return (
        <div>
            <CommonButton type="button" onClick={() => history.goBack()} className=" p-button-raised bg-gray-400 my-4 !p-button-sm" title="Back" label="Back" icon="pi pi-arrow-left" color="p-button-raised" />
        </div>
    );
};

export const SearchButton = ({ loading, type, onClick, label, className, icon }) => {
    return (
      // <div className="">
      <Button
        type={type || "submit"}
        label={label || "Search"}
        loading={loading}
        disabled={loading}
        className={className}
        style={{ padding: "0.75rem" }}
        onClick={onClick}
        icon={icon || <BsSearch className={`text-white text-lg mr-2 `} />}
      />
      // </div>
    );
  };
  

export const DeleteButton = ({ onClick }) => {
    return <CommonButton icon={<AiFillDelete className="text-2xl rounded-md p-mr-2  text-red-500 hover:!text-red-600" />} type="button" className="rounded-md p-mr-2 bg-rose-100 text-red-500 hover:!bg-rose-200 hover:!text-red-600" onClick={onClick} label="Delete" />;
};
export const EditButton = ({ onClick }) => {
    return (
        <div>
            <CommonButton icon={<TbEdit className="text-xl rounded-md p-mr-2  text-emerald-500 hover:!text-emerald-600" />} type="button" className="rounded-md p-mr-2 bg-emerald-100 text-emerald-500 hover:!bg-emerald-200 hover:!text-emerald-600" onClick={onClick} label="Edit" />
        </div>
    );
};
