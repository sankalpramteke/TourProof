// Placeholder blockchain service - will be implemented later
export const verifyTourOnBlockchain = async (tour) => {
  console.log('Blockchain verification skipped - not configured');
  return null;
};

export const verifyTourHash = async (tourId, hash) => {
  console.log('Hash verification skipped - blockchain not configured');
  return false;
};
