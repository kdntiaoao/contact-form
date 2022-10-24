import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ContactFormContainer } from '.'

describe('ContactFormContainer', () => {
  let renderResult: RenderResult
  let handleSubmit: jest.Mock
  let setFieldReadonly: jest.Mock

  beforeEach(() => {
    handleSubmit = jest.fn()
    setFieldReadonly = jest.fn()
    renderResult = render(
      <ContactFormContainer fieldReadonly={false} onSubmit={handleSubmit} setFieldReadonly={setFieldReadonly} />
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('フォーム入力後、hendleSubmitが呼ばれる', async () => {
    const nameField = screen.getByLabelText('お名前') as HTMLInputElement
    const dummyName = '田中太郎'
    userEvent.type(nameField, dummyName) // 名前を入力
    await waitFor(() => expect(nameField).toHaveValue(dummyName)) // 名前が入力されているか

    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    const dummyEmail = 'tanaka.taro@example.com'
    userEvent.type(emailField, dummyEmail) // メールアドレスを入力
    await waitFor(() => expect(emailField).toHaveValue(dummyEmail)) // メールアドレスが入力されているか

    const telField = screen.getByLabelText('電話番号') as HTMLInputElement
    const dummyTel = '08000123456'
    userEvent.type(telField, dummyTel) // 電話番号を入力
    await waitFor(() => expect(telField).toHaveValue(dummyTel)) // 電話番号が入力されているか

    const categoryField = screen.getByLabelText('商品種別') as HTMLInputElement
    const dummyCategory = 'A001'
    userEvent.type(categoryField, `${dummyCategory}{enter}`) // 商品種別を入力
    await waitFor(() => expect(categoryField).toHaveValue(dummyCategory)) // 商品種別が入力されているか

    const contentsField = screen.getByLabelText('お問い合わせ内容') as HTMLInputElement
    const dummyContents =
      'ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。'
    userEvent.type(contentsField, dummyContents) // お問い合わせ内容を入力
    await waitFor(() => expect(contentsField).toHaveValue(dummyContents)) // お問い合わせ内容が入力されているか

    const confirmButton = screen.getByRole('button', { name: '確認する' })
    // fireEvent.click(confirmButton)
    userEvent.click(confirmButton)

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1))
  })

  it('空で送信すると、エラーが表示される', async () => {
    const nameField = screen.getByLabelText('お名前') as HTMLInputElement
    expect(nameField).toHaveValue('') // 名前が入力されていないか

    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    expect(emailField).toHaveValue('') // メールアドレスが入力されていないか

    const telField = screen.getByLabelText('電話番号') as HTMLInputElement
    expect(telField).toHaveValue('') // 電話番号が入力されていないか

    const categoryField = screen.getByLabelText('商品種別') as HTMLInputElement
    expect(categoryField).toHaveValue('') // 商品種別が入力されていないか

    const contentsField = screen.getByLabelText('お問い合わせ内容') as HTMLTextAreaElement
    expect(contentsField).toHaveValue('') // お問い合わせ内容が入力されていないか

    const confirmButton = screen.getByRole('button', { name: '確認する' })
    userEvent.click(confirmButton)

    await waitFor(() => {
      const errorTextElements = screen.getAllByText('入力してください')
      expect(errorTextElements).toHaveLength(5)
    })
  })

  it('制限文字数以上だと、hendleSubmitが呼ばれない', async () => {
    const nameField = screen.getByLabelText('お名前') as HTMLInputElement
    const dummyName = 'abc'.repeat(17)
    fireEvent.change(nameField, { target: { value: dummyName } }) // 名前を入力
    await waitFor(() => expect(nameField).toHaveValue(dummyName)) // 名前が入力されているか

    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    const dummyEmail = 'sample@example.' + 'def'.repeat(100)
    fireEvent.change(emailField, { target: { value: dummyEmail } }) // メールアドレスを入力
    await waitFor(() => expect(emailField).toHaveValue(dummyEmail)) // メールアドレスが入力されているか

    const telField = screen.getByLabelText('電話番号') as HTMLInputElement
    const dummyTel = '01234'.repeat(13).toString()
    fireEvent.change(telField, { target: { value: dummyTel } }) // 電話番号を入力
    await waitFor(() => expect(telField).toHaveValue(dummyTel)) // 電話番号が入力されているか

    const categoryField = screen.getByLabelText('商品種別') as HTMLInputElement
    const dummyCategory = 'A001'
    userEvent.type(categoryField, `${dummyCategory}{enter}`) // 商品種別を入力
    await waitFor(() => expect(categoryField).toHaveValue(dummyCategory)) // 商品種別が入力されているか

    const contentsField = screen.getByLabelText('お問い合わせ内容') as HTMLTextAreaElement
    const dummyContents = 'a'.repeat(2001)
    fireEvent.change(contentsField, { target: { value: dummyContents } }) // お問い合わせ内容を入力
    await waitFor(() => expect(contentsField).toHaveValue(dummyContents)) // お問い合わせ内容が入力されているか

    const confirmButton = screen.getByRole('button', { name: '確認する' })
    userEvent.click(confirmButton)
    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(0))
  })

  it('フォーマットの異なる入力があったら、エラーを表示する', async () => {
    const telField = screen.getByLabelText('電話番号') as HTMLInputElement
    const dummyTel = 'aaaaa'
    userEvent.type(telField, `${dummyTel}{enter}`) // 電話番号を入力
    await waitFor(() => expect(telField).toHaveValue(dummyTel)) // 電話番号が入力されているか

    const emailField = screen.getByLabelText('メールアドレス') as HTMLInputElement
    const dummyEmail = 'aaaaa'
    userEvent.type(emailField, dummyEmail) // メールアドレスを入力
    await waitFor(() => expect(emailField).toHaveValue(dummyEmail)) // メールアドレスが入力されているか

    const errorTextElements = screen.getAllByText('正しい値を入力してください')
    expect(errorTextElements).toHaveLength(2)
  })
})
