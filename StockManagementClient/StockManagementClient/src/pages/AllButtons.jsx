/* eslint-disable no-unused-vars */
import React from "react";
import { CommonButton } from "../components/Buttons/Buttons";

const AllButtons = () => {
  return (
    <div>
      <CommonButton className="p-mr-2 p-button-raised p-button-success" title="Save" disabled={false} label="Save" icon="pi pi-bookmark" color="p-button-raised p-button-success" />
      <CommonButton className="p-button-raised p-button-danger p-mr-2" title="Delete" disabled={false} label="Delete" icon="pi pi-trash" color="p-button-raised p-button-danger" />
      <CommonButton className="p-mr-2 p-button-raised p-button-warning" title="update" disabled={false} label="Update" icon="pi pi-pencil" color="p-button-raised p-button-danger" />
      <CommonButton className="p-mr-2 p-button-raised p-button-primary" title="Submit" disabled={false} label="Submit" icon="pi pi-check" color="p-button-raised p-button-danger" />
      <CommonButton className="p-mr-2 p-button-raised p-button-primary" title="Submit" disabled={true} label="Loading" icon="pi pi-spin" color="p-button-raised p-button-danger" loading={true} />
      <CommonButton className="p-mr-2 p-button-raised p-button-success" title="Approve" disabled={false} label="Approve" icon="pi pi-check" color="p-button-raised p-button-success" loading={false} />
      <CommonButton className="p-mr-2 p-button-raised p-button-danger" title="Reject" disabled={false} label="Reject" icon="pi pi-times" color="p-button-raised p-button-success" loading={false} />
      <CommonButton className="p-mr-2 p-button-raised p-button-warning" title="recall" disabled={false} label="Recall" icon="pi pi-replay" color="p-button-raised p-button-danger" />
      <CommonButton className="p-mr-4 p-button-raised p-button-success" title="addMaterial" disabled={false} label="Add Material" icon="pi pi-plus" color="p-button-raised p-button-danger" />
    </div>
  );
};

export default AllButtons;
