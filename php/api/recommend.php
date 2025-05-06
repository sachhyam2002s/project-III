<?php
require_once '../config/db.php';

// Fetch product features (brand and price)
$sql = "SELECT id, name, brand, price, image FROM products";
$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    // Using brand directly instead of crc32 for better categorization
    $data[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'brand' => $row['brand'],  // Keep brand as is for now
        'price' => (float) $row['price'],
        'image' => $row['image']
    ];
}

// Basic K-Means Clustering (recommended algorithm)
function kmeans($data, $k = 2, $iterations = 5) {
    // Randomly initialize centroids from data points
    $centroids = array_slice($data, 0, $k);
    
    for ($i = 0; $i < $iterations; $i++) {
        $clusters = array_fill(0, $k, []);
        
        // Assign products to the nearest centroid
        foreach ($data as $item) {
            $distances = array_map(function ($centroid) use ($item) {
                // Euclidean distance considering brand and price
                return sqrt(pow($item['price'] - $centroid['price'], 2));
            }, $centroids);
            
            // Assign to closest centroid
            $closest = array_keys($distances, min($distances))[0];
            $clusters[$closest][] = $item;
        }

        // Update centroids
        foreach ($clusters as $key => $cluster) {
            if (count($cluster) > 0) {
                $centroids[$key]['price'] = array_sum(array_column($cluster, 'price')) / count($cluster);
            }
        }
    }
    
    return $clusters;
}

// Run K-Means and return a recommended cluster
$clusters = kmeans($data, 2);  // Adjust k value if needed
$recommended = $clusters[0];  // You can modify this logic to choose the best cluster

// Return recommended products as JSON
header('Content-Type: application/json');
echo json_encode($recommended);
?>
