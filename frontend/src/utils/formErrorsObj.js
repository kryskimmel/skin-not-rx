function formErrorsObj(errorMessage) {
    try {
      const errors = JSON.parse(errorMessage);
      if (Array.isArray(errors)) {
        return errors.reduce((acc, error) => {
          const [field, message] = error.split(' : ');
          acc[field.trim()] = message.trim();
          return acc;
        }, {});
      }
    } catch (error) {
      console.error('Parsing error message:', error);
    }
    return {};
  }

export default formErrorsObj;