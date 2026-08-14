import * as Yup from "yup"
const today = new Date();
today.setHours(23, 59, 59, 999);
export const filterValidationSchema = Yup.object({
    agents: Yup.array(),

    outcome: Yup.array(),

    minDuration: Yup.number()
        .min(0)
        .max(300)
        .required(),

    maxDuration: Yup.number()
        .min(0)
        .max(300)
        .required()
        .test(
            "max-duration",
            "Maximum duration must be greater than or equal to minimum duration",
            function (value) {
                return value >= this.parent.minDuration
            }
        ),

    fromDate: Yup.date()
        .nullable()
        .typeError("Invalid start date")
    ,

    toDate: Yup.date()
        .nullable()
        .typeError("Invalid end date")
        .max(
            today,
            "End date cannot be in the future"
        )
        .test(
            "date-range",
            "End date must be greater than or equal to start date",
            function (value) {
                const { fromDate } = this.parent

                if (!fromDate || !value) {
                    return true
                }

                return value >= fromDate
            }
        ),
})