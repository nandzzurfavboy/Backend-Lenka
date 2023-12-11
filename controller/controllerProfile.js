const query = require('../database');

const getProfile = async (req, res) => {
  try {
    const data = await query(`SELECT * FROM photographer`);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const createProfile = async (req, res) => {
  const { name, price, city, phone_number, socmed, email, category } = req.body;

  try {
    //  prevent SQL injection
    const { ProfileId: id } = await query(
      `
        INSERT INTO photographer (
            name, price, city, phone_number, socmed, email, category
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?
        );
      `,
      [name, price, city, phone_number, socmed, email, category]
    );

    return res.status(200).json({
      message: 'Create profile success!',
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, price, city, phone_number, socmed, email, category } = req.body;
  try {
    const result = await query(
      `
      UPDATE photographer 
      SET 
      name = ?,
      price = ?,
      city = ?,
      phone_number = ?,
      socmed = ?,
      email = ?,
      category = ?
      WHERE
      id = ?;
    `,
      [name, price, city, phone_number, socmed, email, category, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `User dengan id ${id} tidak ditemukan!`,
      });
    }
    return res.status(200).json({
      message: 'Update profile berhasil',
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const updateProfileById = async (req, res) => {
  const { id } = req.params;
  const { name, price, city, phone_number, socmed, email, category } = req.body;

  try {
    const result = await query(
      `
      UPDATE photographer
      SET
        name  = COALESCE(?, name),
        price = COALESCE(?, price),
        city = COALESCE(?,city)，
        phone_number = COALESCE(?,phone_number)，
        socmed = COALESCE(?,socmed)，
        email = COALESCE(?,email)，
        category = COALESCE(?,category)
        WHERE
      id = ?;
      `,
      [name, price, city, phone_number, socmed, email, category, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Update Profile untuk id ${id} gagal dilakukan`,
      });
    }
    return res.status(200).json({
      message: 'Update Profile  BERHASIL',
      data: {
        id,
        ...req.body,
      },
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
// BAGIAN DALAM RESULT QUERY ERROR //
const deteleProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query(
      `
      DELETE FROM photographer
       WHERE
       id = ?;
      `,
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Delete Profile is Not found!!',
      });
    }
    return res.status(200).json({
      message: 'Deleted Profile is Succes',
      data: {
        id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  updateProfileById,
  deteleProfile,
};
