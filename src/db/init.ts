export const fetchData = () => {
  fetch('/public/data/marx/judge.json', { method: 'get' }).then(async res => {
    console.log('json: ', await res.json())
  })
}
