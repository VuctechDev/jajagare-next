const nget = async () => {
  const response = await fetch("http://localhost:3000/api/yield");
  const data = await response.json();

  console.log(data.data);
};

nget();
