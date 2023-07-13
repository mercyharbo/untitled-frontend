// api.js
export const fetchUserProfile = async (userId, token) => {
  try {
    const response = await fetch(
      `${process.env.API_ENDPOINT_RENDER}/api/profile?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    if (data?.status === true) {
      return data.profile
    } else {
      console.log('Error occurred')
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
