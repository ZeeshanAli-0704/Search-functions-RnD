  
  const dummyData = [{ name: "zeeshan" }, { name: "Ali" }];
  const createSearchCombinations = (searchText) => {
    const regex = /(\w+)[\/\s]([\s\S]*)/m;
    const match = regex.exec(searchText);
    const combinations = [];
    const subsets = [];
    if (match && match.length > 1) {
      for (let i = 1; i < match.length; i++) {
        if (match[i].length) {
          subsets.push(match[i]);
        }
      }
    }
    combinations.push(searchText);

    if (subsets.length) {
      const newSubsets = this.permutator(subsets);
      newSubsets.forEach((eachNewSubset) => {
        combinations.push(eachNewSubset);
        const specialCharRegex = /[^A-Za-z0-9]/g;
        const searchTextExceptSpecialChar = eachNewSubset.replace(
          specialCharRegex,
          ""
        );
        combinations.push(searchTextExceptSpecialChar);

        const removeConsecutiveDuplicateRegex = /(.)\1+/g;
        const searchTextExceptConsecutiveRepeatingChar = searchTextExceptSpecialChar.replace(
          removeConsecutiveDuplicateRegex,
          "$1"
        );

        combinations.push(searchTextExceptConsecutiveRepeatingChar);

        const removeVowelRegex = /[aeiou]/g;
        const searchTextExceptVowelChar = searchTextExceptConsecutiveRepeatingChar.replace(
          removeVowelRegex,
          ""
        );

        combinations.push(searchTextExceptVowelChar);
      });
    }

    const specialCharRegex = /[^A-Za-z0-9]/g;
    const searchTextExceptSpecialChar = searchText.replace(
      specialCharRegex,
      ""
    );
    combinations.push(searchTextExceptSpecialChar);

    const removeConsecutiveDuplicateRegex = /(.)\1+/g;
    const searchTextExceptConsecutiveRepeatingChar = searchTextExceptSpecialChar.replace(
      removeConsecutiveDuplicateRegex,
      "$1"
    );

    combinations.push(searchTextExceptConsecutiveRepeatingChar);

    const removeVowelRegex = /[aeiou]/g;
    const searchTextExceptVowelChar = searchTextExceptConsecutiveRepeatingChar.replace(
      removeVowelRegex,
      ""
    );

    combinations.push(searchTextExceptVowelChar);

    return [...new Set(combinations)];
  };

  const fuzzySearch = (text, search1) => {
    if (!search1.length) {
      return true;
    }

    const search = search1.replace(" ", "").toLowerCase();
    const tokens = [];
    let searchPosition = 0;

    // Go through each character in the text
    for (let n = 0; n < text.length; n++) {
      let textChar = text[n];
      // if we match a character in the search, highlight it
      if (
        searchPosition < search.length &&
        textChar.toLowerCase() === search[searchPosition]
      ) {
        textChar = "<b>" + textChar + "</b>";
        searchPosition += 1;
      }
      tokens.push(textChar);
    }
    // If are characters remaining in the search text,
    // return an empty string to indicate no match
    if (searchPosition !== search.length) {
      return false;
    }
    return true;
  };
  const isMatchWithData = (searchedText, text) => {
    if (!searchedText.trim()) {
      return true;
    }
    const combinations = createSearchCombinations(searchedText);

    const res = combinations.find((eachCombination) => {
      return fuzzySearch(text, eachCombination);
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  };

  const search = (searchText) => {
    const filteredData = dummyData.filter((eachData) => {
      const isDisplayTextMatch = isMatchWithData(searchText, eachData.name);

      if (isDisplayTextMatch) return eachData;

      return false;
    });
    return filteredData;
  };

  console.log(search("a"))
