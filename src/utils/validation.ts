export const validateDate = (dateString: string): boolean => {
  const dateRegex = /^(\d{4})(-\d{2})?(-\d{2})?$/;
  return dateRegex.test(dateString);
};

export const validateNoteForm = (
  title: string,
  date: string,
): { isValid: boolean; error?: string } => {
  if (!title.trim()) {
    return { isValid: false, error: "Title is required" };
  }

  if (!date.trim()) {
    return { isValid: false, error: "Date is required" };
  }

  if (!validateDate(date)) {
    return {
      isValid: false,
      error:
        "Date must be in one of these formats: YYYY, YYYY-MM, or YYYY-MM-DD",
    };
  }

  return { isValid: true };
};
