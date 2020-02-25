def sample_to_idx(sample):
    return vocab.index(sample)

# converts a frequency sample to a one-hot encoded representation
def one_hot_encode_sample(sample):
    tensor = torch.zeros(1, vocab_length)
    tensor[0][sample_to_idx(sample)] = 1
    return tensor