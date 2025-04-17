export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
      <div className="form-check">
        <input
          className={`form-check-input ${errors[name] && "is-invalid"}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        {/* Radio 使用 Name 欄位 */}
        <label className="form-check-label" htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className="invalid-feedback">{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};
export const Input = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        className={`form-control ${errors[id] && "is-invalid"}`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};

export const InputDate = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  placeholder,
  defaultValue,
  min, // ✅ 新增支援 min（給 date 用）
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue} // ✅ 支援預設值
        min={min} // ✅ 支援 min 限制
        className={`form-control ${errors[id] && "is-invalid"}`}
        placeholder={placeholder}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};
export const InputExp = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules1,
  rules2,
  placeholder1,
  placeholder2,
  inputmode,
  setValue,
  trigger,
}) => {
  const handleInputChange = (e) => {
    // 僅允許數字 & 最多兩位
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    e.target.value = value;
    console.log(e.target.value);
  };

  const handleBlur = async (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (value.length === 1) {
      const padded = "0" + value;

      setValue(name, padded); // 更新 RHF 的值
      await trigger(name); // 手動觸發驗證
    }
  };

  const registerMonth = register(`${id}-month`, rules1);
  const registerYear = register(`${id}-year`, rules2);
  return (
    <>
      <div className="form-group">
        <label htmlFor={`${id}-month`} className="form-label">
          {labelText}
        </label>
        <div className="row row-cols-2 justify-content-between gx-3">
          <div className="col">
            <input
              id={`${id}-month`} // 使用不同的 ID
              type={type}
              className={`form-control ${
                errors[`${id}-month`] && "is-invalid"
              }`}
              placeholder={placeholder1}
              inputMode={inputmode}
              maxLength={2}
              onChange={handleInputChange}
              {...registerMonth} // 使用不同的 name
              onBlur={(e) => {
                handleBlur(e); // 補 0 + setValue + trigger
                registerMonth.onBlur(e); // ✅ 手動呼叫 RHF 原本的 onBlur
              }}
            />
            {errors[`${id}-month`] && (
              <div className="invalid-feedback">
                {errors[`${id}-month`]?.message}
              </div>
            )}
          </div>
          <div className="col">
            <input
              id={`${id}-year`} // 使用不同的 ID
              type={type}
              className={`form-control ${errors[`${id}-year`] && "is-invalid"}`}
              placeholder={placeholder2}
              inputMode={inputmode}
              maxLength={2}
              onChange={handleInputChange}
              {...registerYear} // 使用不同的 name
            />
            {errors[`${id}-year`] && (
              <div className="invalid-feedback">
                {errors[`${id}-year`]?.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const InputCredit = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  placeholder,
  inputmode,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <div className="input-group">
        <input
          id={id}
          type={type}
          className={`form-control ${errors[id] && "is-invalid"}`}
          placeholder={placeholder}
          inputMode={inputmode}
          {...register(id, rules)}
        />
        <span className="input-group-text bg-light">
          <i className="bi bi-credit-card"></i>
        </span>
        {errors[id] && (
          <div className="invalid-feedback">{errors[id]?.message}</div>
        )}
      </div>
    </>
  );
};

export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && "is-invalid"}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className="invalid-feedback">{errors[id]?.message}</div>
      )}
    </>
  );
};
