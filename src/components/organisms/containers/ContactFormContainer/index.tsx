import { memo } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { ContactForm } from 'components/organisms/presentations/ContactForm'
import { ContactFormInputsType } from 'types/input'

type Props = {
  onSubmit: SubmitHandler<ContactFormInputsType>
}

// eslint-disable-next-line react/display-name
export const ContactFormContainer = memo(({ onSubmit }: Props) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormInputsType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '田中太郎',
      email: 'sample@example.com',
      tel: '08000121234',
      category: 'A001',
      contents:
        '私は当時しばしばどんな講演院というのの以上と信じうです。けっして生涯を落第者はよほどその修養あるただけとするばみますのは意味するだないが、あくまでには退けなかっましたない。個人に明らめでつもりはまあ今日にまあましありた。正しく向さんが関係道少し手続きに散らかすう各人その廃墟私か影響がという今品評ならたですんて、このたくさんもあなたか一般本にたべが、岡田さんの事に肉のそれにとにかくご想像としがあなた骨とご撲殺が甘んじように断然お運動をいでなけれと、たといよし運動が掴むたばくれたものが減っでだ。もっともそれから大力で賑わすのはそう窮屈としなて、その角度にはありなてという世の中を認めば来ですます。',
    },
  })

  return (
    <>
      <ContactForm
        control={control}
        errors={errors}
        isSubmitting={isSubmitting}
        isSubmitSuccessful={isSubmitSuccessful}
        onSubmit={handleSubmit(onSubmit)}
        setValue={setValue}
      />
    </>
  )
})
