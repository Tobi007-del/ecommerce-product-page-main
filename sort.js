myArray.sort(function (a, b) {
  if (a.startsWith("Eng.") && !b.startsWith("Eng.")) {
    return -1;
  } else if (!a.startsWith("Eng.") && b.startsWith("Eng.")) {
    return 1;
  }
});
