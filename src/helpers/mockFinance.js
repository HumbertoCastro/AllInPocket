const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const types = ['food', 'delivery', 'rent', 'gym', 'car insurence', 'life insurence', 'cleaning', 'education', 
'light', 'water', 'gas', 'internet', 'Restaurants', 'drug store', 'self care', 'medic', 'dentist', 'car', 'travel', 'present', 'cloats']

const typesSalary = ['Salary' , 'Investiments', 'Sales', 'Others']

const yearFinance = monthNames.map((month) => {
  const mockObjects = [];
  const mockProfit = [];
  for (let i = 0; i < 31; i += 1) {
    const x = types[Math.floor(Math.random()*types.length)];
    const valor = Math.floor(Math.random() * 10000);
    mockObjects.push({
      date: i,
      value: valor,
      type: x,
      name: 'compra fake',
    })
  }
  for (let i = 0; i < 31; i += 1) {
    const x = typesSalary[Math.floor(Math.random()*typesSalary.length)];
    const valor = Math.floor(Math.random() * 10000);
    mockProfit.push({
      date: i,
      value: valor,
      type: x,
      name: 'compra fake',
    })
  }

  return (
    {
      month,
      expenses: mockObjects,
      profit: mockProfit,
    }
  )
});

export default yearFinance;