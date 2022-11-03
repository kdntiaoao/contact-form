import { Dispatch, memo, SetStateAction, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ContactForm } from 'components/organisms/presentations/ContactForm'
import { ContactFormInputsType } from 'types/input'

type Props = {
  fieldReadonly: boolean
  onSubmit: SubmitHandler<ContactFormInputsType>
  setFieldReadonly: Dispatch<SetStateAction<boolean>>
}

const emailRegex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/

const schema = z.object({
  name: z.string().min(1, { message: '入力してください' }).max(16, { message: '16文字以内にしてください' }),
  email: z
    .string()
    .min(1, { message: '入力してください' })
    .max(200, { message: '200文字以内にしてください' })
    .refine((value) => emailRegex.test(value), { message: '正しい値を入力してください' }),
  tel: z
    .string()
    .min(1, { message: '入力してください' })
    .max(12, { message: '12文字以内にしてください' })
    .refine((value) => !Number.isNaN(Number(value)), { message: '正しい値を入力してください' }),
  category: z.string().min(1, { message: '入力してください' }),
  contents: z.string().min(1, { message: '入力してください' }).max(2000, { message: '2000文字以内にしてください' }),
})

// eslint-disable-next-line react/display-name
export const ContactFormContainer = memo(({ fieldReadonly, onSubmit, setFieldReadonly }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputsType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      tel: '',
      category: '',
      contents: '',
    },
  })

  const handleClickFixButton = useCallback(() => setFieldReadonly(false), [setFieldReadonly])

  return (
    <>
      <ContactForm
        control={control}
        errors={errors}
        fieldReadonly={fieldReadonly}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        handleClickFixButton={handleClickFixButton}
        setValue={setValue}
      />
    </>
  )
})
