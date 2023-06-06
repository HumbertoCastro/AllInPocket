const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const yearFinance = monthNames.map((month) => {
  return (
    {
      month,
      expenses: [],
      profit: [],
    }
  )
});

export default yearFinance;