import React from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";

interface AppForm {
  initialValues: {
    [key: string]: any;
  };
  onSubmit: (values: any) => void;
  validationSchema: any;
  children: React.ReactNode;
}

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: AppForm) {
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

export default AppForm;

const styles = StyleSheet.create({
  container: {},
});
