import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";

import { RootStackParamList } from "../../App";
import Back from "components/Back/Back";
import BasicTextInput from "components/BasicTextInput/BasicTextInput";
import BasicButton from "components/BasicButton/BasicButton";
import Loader from "components/Loader/Loader";
import {
  ColumnCenterWrapper,
  InputsWrapper,
  KeyboardScreen,
} from "styles/shared";
import i18n from "../../i18n";
import { ApiErrors } from "enums/api-errors";
import plantsApi from "config/api/plants";
import { ImportPlantSchema } from "schemas/ImportPlant.schema";
import { useToastStore } from "../../newStore";

type ImportPlantProps = NativeStackScreenProps<
  RootStackParamList,
  "importPlant"
>;

interface ImportPlantForm {
  plantShareId: string;
}

const { t } = i18n;

const ImportPlant = ({ navigation }: ImportPlantProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const displayToast = useToastStore((state) => state.showToast);

  const onSubmit = async (
    values: ImportPlantForm,
    {
      resetForm,
    }: {
      resetForm: FormikHelpers<ImportPlantForm>["resetForm"];
    }
  ) => {
    try {
      setLoading(true);

      await plantsApi.post("/plants/import", {
        shareId: values.plantShareId,
      });
      resetForm();
      navigation.navigate("home");
      displayToast({ text: t("pages.plants.import.success"), type: "success" });
    } catch (error) {
      console.log(error);
      switch (error) {
        case ApiErrors.PLANT_ALREADY_ADDED:
          return displayToast({ text: t("errors.plantAlreadyAdded"), type: "info" });
        case ApiErrors.INVALID_PLANT:
          return displayToast({ text: t("errors.plantNotExists"), type: "error" });
        default:
          return displayToast({ text: t("errors.general"), type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreen
      contentContainerStyle={{ paddingBottom: 50 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      bounces={false}
    >
      <ColumnCenterWrapper>
        <Back navigation={navigation} />

        {!loading ? (
          <Formik
            initialValues={{
              plantShareId: "",
            }}
            onSubmit={onSubmit}
            validationSchema={ImportPlantSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <InputsWrapper>
                <BasicTextInput
                  value={values.plantShareId}
                  label={t("pages.plants.import.inputLabel")}
                  placeholder={t("pages.plants.import.inputPlaceholder")}
                  onChangeText={handleChange("plantShareId")}
                  onBlur={handleBlur("plantShareId")}
                  error={errors.plantShareId}
                />
                <View style={{ marginVertical: 30 }}>
                  <BasicButton
                    onPress={handleSubmit as (values: unknown) => void}
                    text={t("common.confirm")}
                  />
                </View>
              </InputsWrapper>
            )}
          </Formik>
        ) : (
          <Loader />
        )}
      </ColumnCenterWrapper>
    </KeyboardScreen>
  );
};

export default ImportPlant;