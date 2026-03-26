/**
 * Baserow API Service
 * Responsável por enviar os leads capturados na simulação para o banco de dados real.
 */

const BASEROW_TOKEN = import.meta.env.VITE_BASEROW_TOKEN
const BASEROW_TABLE_ID = import.meta.env.VITE_BASEROW_TABLE_ID

export const saveLeadToBaserow = async (leadData) => {
  if (!BASEROW_TOKEN || !BASEROW_TABLE_ID) {
    console.warn('Baserow: Token ou Table ID não configurados. O lead será salvo apenas localmente.')
    return false
  }

  try {
    const response = await fetch(`https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE_ID}/?user_field_names=true`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BASEROW_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'Nome': leadData.name,
        'Email': leadData.email,
        'Telefone': leadData.phone,
        'Empresa': leadData.company,
        'Seguimento': leadData.segment,
        'Data': new Date().toISOString()
      }),
    })

    if (!response.ok) {
      throw new Error(`Erro Baserow: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Falha ao salvar lead no Baserow:', error)
    return false
  }
}
