const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/knapsack", (req, res) => {
  const { totalAcres, crops } = req.body;
  const result = calculateKnapsack(totalAcres, crops);
  res.json(result);
});

const calculateKnapsack = (totalAcres, crops) => {
  let remainingAcres = totalAcres;
  let totalProfit = 0;
  const selectedCrops = [];

  crops.sort((a, b) => b.profitPerAcre - a.profitPerAcre);

  for (const crop of crops) {
    if (remainingAcres > 0) {
      const acresAllocated = Math.min(remainingAcres, crop.acres);
      totalProfit += acresAllocated * crop.profitPerAcre;
      remainingAcres -= acresAllocated;
      selectedCrops.push({
        ...crop,
        acresAllocated,
        profit: acresAllocated * crop.profitPerAcre,
      });
    }
  }

  return {
    totalProfit,
    selectedCrops,
  };
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
