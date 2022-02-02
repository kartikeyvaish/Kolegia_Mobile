// Packages Imports
import { Formik } from "formik";

// Types import
import { AppFormProps } from "../types/ComponentTypes";

function AppForm(props: AppFormProps) {
  // Destructuring props
  const { initialValues, onSubmit, validationSchema, children } = props;

  // render
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

// exports
export default AppForm;
