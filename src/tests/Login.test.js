import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'

describe('Testa componente Login', () => {
  it('Verifica se Login foi redenrizada com input para nome, email, um botão "Play" desabilitado, um botão "Settings" ',()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByTestId('btn-play')
    const btnSettings = screen.getByTestId('btn-settings')
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(btnPlay).toBeDisabled()
    expect(btnSettings).toBeInTheDocument()

  })
  it('Verifica se o botão é habilitado quando preenchido nome e email',()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByTestId('btn-play')
    userEvent.type(inputName, 'Bode do Milhão')
    userEvent.type(inputEmail, 'bode@gmail.com')
    expect(btnPlay).toBeEnabled()

  })
  it('Verifica se API é chamada, e a pagina é redirecionada para pagina de jogo', async ()=>{
    const {history} = renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnPlay = screen.getByTestId('btn-play')
    userEvent.type(inputName, 'Bode do Milhão')
    userEvent.type(inputEmail, 'bode@gmail.com')
    userEvent.click(btnPlay)
    const token = localStorage.getItem('token')
    expect(token).not.toBeUndefined()
    await waitFor(()=>{
      const {location:{pathname}} = history
      expect(pathname).toBe('/game')
    })
  })
  it('Verifica se a pagina é redirecionada para pagina de configurações',()=>{
    renderWithRouterAndRedux(<App/>)
    const inputName = screen.getByTestId('input-player-name')
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const btnSettings = screen.getByTestId('btn-settings')
    userEvent.type(inputName, 'Bode do Milhão')
    userEvent.type(inputEmail, 'bode@gmail.com')
    userEvent.click(btnSettings)
    const title = screen.getByTestId('settings-title')
    expect(title).toBeInTheDocument()
    
  })

})